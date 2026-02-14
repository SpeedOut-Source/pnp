$Source = "D:\biplobsddotme\next.js\packages\next\dist"
$Dest = "D:\biplobsddotme\main\node_modules\next\dist"

if (-not (Test-Path $Source)) {
    Write-Error "Source build not found at $Source. Run 'pnpm dev' or 'npx taskr' in packages/next first."
    exit 1
}

if (-not (Test-Path $Dest)) {
    Write-Warning "Destination 'node_modules/next/dist' not found. Ensure you have run 'bun install' in the main project."
    New-Item -ItemType Directory -Force -Path $Dest | Out-Null
}

Write-Host "Syncing Next.js build from D:\biplobsddotme\next.js..."
Copy-Item -Path "$Source\*" -Destination $Dest -Recurse -Force
Write-Host "Sync complete! You can now test your changes."
