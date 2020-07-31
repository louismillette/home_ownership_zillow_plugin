RMDIR /S /Q build
xcopy "CSS" "build/CSS" /E /H /C /I
xcopy "JS" "build/JS" /E /H /C /I
xcopy "img" "build/img" /E /H /C /I
xcopy "vendor" "build/vendor" /E /H /C /I
npm run prod
echo "DONE."
pause