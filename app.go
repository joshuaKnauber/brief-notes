package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const PATH = "C:\\Users\\Joshua\\Documents\\Brief"

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {

	initStore()

	a.ctx = ctx
}

type MarkdownFile struct {
	Name      string `json:"name"`
	Path      string `json:"path"`
	Content   string `json:"content"`
	LastSaved int64  `json:"lastSaved"`
}

func (a *App) GetListOfFiles() []MarkdownFile {
	items, err := os.ReadDir(PATH)
	if err != nil {
		return make([]MarkdownFile, 0)
	}
	var files []MarkdownFile
	for _, item := range items {
		fileName := item.Name()
		if item.IsDir() || (!strings.HasSuffix(fileName, ".md")) {
			continue
		}

		filePath := filepath.Join(PATH, fileName)
		info, err := item.Info()
		if err != nil {
			continue
		}
		name := strings.TrimSuffix(fileName, filepath.Ext(fileName))

		content, err := os.ReadFile(filePath)
		if err != nil {
			continue
		}

		files = append(files, MarkdownFile{
			Name:      name,
			Path:      filePath,
			Content:   string(content),
			LastSaved: info.ModTime().Unix(),
		})
	}
	return files
}

func (a *App) CreateNote(filename string) {
	err := os.WriteFile(filepath.Join(PATH, filename+".md"), []byte(""), 0755)
    if err != nil {
        fmt.Printf("unable to write file: %w", err)
    }
}

func (a *App) SaveContent(path string, content string) {
	err := os.WriteFile(path, []byte(content), 0755)
	if err != nil {
		fmt.Printf("unable to write file: %w", err)
	}
}

func (a *App) RenameFile(path string, newName string) bool {
	newPath := filepath.Join(filepath.Dir(path), newName+".md")
	err := os.Rename(path, newPath)
	if err != nil {
		fmt.Printf("unable to rename file: %w", err)
		return false
	}
	return true
}