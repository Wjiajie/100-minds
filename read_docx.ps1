$docxFiles = Get-ChildItem "c:\Users\jiaji\Documents\github-project\100-minds\app\src\refs\*OODA*.docx"
$docxPath = $docxFiles[0].FullName
$zipPath = $docxPath -replace '\.docx$', '.zip'
Copy-Item $docxPath $zipPath -Force

$tempDir = "c:\Users\jiaji\Documents\github-project\100-minds\temp_docx"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
Expand-Archive -Path $zipPath -DestinationPath $tempDir -Force

$xmlPath = "$tempDir\word\document.xml"
$xml = Get-Content $xmlPath -Raw -Encoding UTF8
$text = $xml -replace '</w:p>', "`n"
$text = $text -replace '<[^>]+>', ''
Set-Content "c:\Users\jiaji\Documents\github-project\100-minds\ooda_content.txt" -Value $text -Encoding UTF8
Remove-Item -Recurse -Force $tempDir
Remove-Item -Force $zipPath
