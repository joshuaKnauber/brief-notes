package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path"
)

func getStorePath() string {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		panic("Could not get cache directory")
	}
	return path.Join(cacheDir, "Brief")
}

func getSettingsPath() string {
	storePath := getStorePath()
	settingsPath := path.Join(storePath, "settings.json")
	return settingsPath
}

type AppSettings struct {
	RootDir string `json:"RootDir"`
}

// Function to load settings, creating file with default settings if it doesn't exist
func getSettings() AppSettings {
	storePath := getStorePath()
	settingsPath := getSettingsPath()

	// Ensure the directory exists
	if err := os.MkdirAll(storePath, os.ModePerm); err != nil {
		panic(fmt.Sprintf("Could not create settings directory: %v", err))
	}

	defaultSettings := AppSettings{RootDir: storePath}

	// Try opening the file directly
	file, err := os.OpenFile(settingsPath, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		panic(fmt.Sprintf("Could not open settings file: %v", err))
	}
	defer file.Close()

	// If file is newly created or empty, write default settings
	info, _ := file.Stat()
	if info.Size() == 0 {
		writeSettings(defaultSettings)
		return defaultSettings
	}

	// Read existing settings from the file
	data, err := io.ReadAll(file)
	if err != nil {
		panic(fmt.Sprintf("Could not read settings file: %v", err))
	}
	fmt.Println(string(data))

	// Unmarshal JSON data into AppSettings struct
	var settings AppSettings
	if err = json.Unmarshal(data, &settings); err != nil {
		panic(fmt.Sprintf("Could not parse settings JSON: %v", err))
	}
	fmt.Printf(settings.RootDir)

	return settings
}

func writeSettings(settings AppSettings) {
	settingsPath := getSettingsPath()
	settingsData, err := json.MarshalIndent(settings, "", "  ")
	if err != nil {
		panic(fmt.Sprintf("Could not marshal settings: %v", err))
	}

	// Write settings to file, truncating any previous content
	err = os.WriteFile(settingsPath, settingsData, 0644)
	if err != nil {
		panic(fmt.Sprintf("Could not write settings to file: %v", err))
	}
}
