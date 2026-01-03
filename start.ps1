# GlobeTrotter Startup Script

Write-Host "Starting GlobeTrotter..." -ForegroundColor Cyan

# Check for .env in server
if (-not (Test-Path "server\.env")) {
    Write-Host "creating default .env for server..."
    Set-Content -Path "server\.env" -Value "DATABASE_URL=`"postgresql://postgres:password@localhost:5432/globe_trotter?schema=public`"`nPORT=3000`nJWT_SECRET=`"super_secret_jwt_key_development_only`""
}

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "server" -NoNewWindow

Write-Host "Starting Frontend Client..." -ForegroundColor Green
Start-Process -FilePath "npm.cmd" -ArgumentList "run dev" -WorkingDirectory "client" -NoNewWindow

Write-Host "GlobeTrotter is running!" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:3000"
Write-Host "Frontend: http://localhost:5173"
