package main

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

// Config struct for storing path
type Config struct {
	RootDir string `json:"rootDir"`
}

var configFilePath string

func initStore() error {
	// Get the system cache directory
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		return fmt.Errorf("failed to get cache directory: %v", err)
	}

	// Create the "Brief" folder inside the cache directory
	briefDir := filepath.Join(cacheDir, "Brief")
	err = os.MkdirAll(briefDir, os.ModePerm)
	if err != nil {
		return fmt.Errorf("failed to create Brief directory: %v", err)
	}

	// Define the full path for the config file
	configFilePath = filepath.Join(briefDir, "config.json")

	// Check if config file exists, initialize if not
	_, err = os.Stat(configFilePath)
	if os.IsNotExist(err) {
		file, err := os.Create(configFilePath)
		if err != nil {
			return fmt.Errorf("failed to create config file: %v", err)
		}
		defer file.Close()

		// Initialize with empty config
		config := Config{RootDir: ""}
		encoder := json.NewEncoder(file)
		err = encoder.Encode(config)
		if err != nil {
			return fmt.Errorf("failed to encode config: %v", err)
		}
		fmt.Println("Initialized new config file with empty path.")
	}
	return nil
}

// UpdatePath function to update the path and save it to the config file
func (app *App) UpdatePath(newPath string) error {
	// Create a new Config struct with the updated path
	config := Config{RootDir: newPath}

	// Save the updated config to the JSON file
	file, err := os.Create(configFilePath)
	if err != nil {
		return fmt.Errorf("failed to create config file: %v", err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	err = encoder.Encode(config)
	if err != nil {
		return fmt.Errorf("failed to encode config: %v", err)
	}

	fmt.Println("Path updated to:", config.RootDir)
	return nil
}

// GetPath function to retrieve the current path directly from the config file
func (app *App) GetPath() (string, error) {
	// Open the config file
	file, err := os.Open(configFilePath)
	if err != nil {
		return "", fmt.Errorf("failed to open config file: %v", err)
	}
	defer file.Close()

	// Decode the JSON file to get the current path
	var config Config
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&config)
	if err != nil {
		return "", fmt.Errorf("failed to decode config: %v", err)
	}

	fmt.Println("Retrieved path:", config.RootDir)
	return config.RootDir, nil
}
