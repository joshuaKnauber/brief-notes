package main

import (
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	wailsconfigstore "github.com/AndreiTelteu/wails-configstore"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// config store
	configStore, errStore := wailsconfigstore.NewConfigStore("BriefNotes")
	if errStore != nil {
		fmt.Printf("could not initialize the config store: %v\n", errStore)
		return
	}

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Brief",
		Width:  1024,
		Height: 768,
		MinWidth: 500,
        MinHeight: 400,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 255, G: 255, B: 255, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			configStore,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
