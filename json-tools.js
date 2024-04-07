/*INDEX PAGE CODE*/

document.addEventListener("DOMContentLoaded", function () {
    // Get references to the relevant elements
    var pretextTextarea = document.getElementById("pretext");
    var restextTextarea = document.getElementById("restext");
    var spaceToComma = document.getElementById("spaceToComma");
    var add1Checkbox = document.getElementById("add1");
    var breakToSpcae = document.getElementById("breakToSpcae");
    var commaToSpace = document.getElementById("commaToSpace");
    var removeDuplicatesCheckbox = document.getElementById("removeDuplicates");
    var commasToLineBreak = document.getElementById("commasToLineBreaks");
    var copyButton = document.getElementById("clipboard");
    var resultText;

    // Add event listener to the form
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get the value from the 'Text to edit' textarea
        var originalText = pretextTextarea.value;
       
        if (removeDuplicatesCheckbox.checked && !commasToLineBreak.checked && !custom.checked && !spaceToComma.checked && !breakToSpcae.checked && !commaToSpace.checked) {
            resultText = removeDuplicateLines(originalText);
        // Check if the 'Change commas to line breaks' radio button is selected
        }else if (commasToLineBreak.checked){
            resultText = originalText.replace(/,\s*/g, "\n");
            // Check if the 'Remove Duplicates' checkbox is checked
            if (removeDuplicatesCheckbox.checked) {
                resultText = removeDuplicateLines(resultText);
            }
        // Check if the 'Change line breaks to commas' radio button is selected
        }else if (spaceToComma.checked){
            // Check if the 'Remove Duplicates' checkbox is checked
            if (removeDuplicatesCheckbox.checked) {
                resultText = removeDuplicateLines(originalText);
                resultText = resultText.replace(/\n/g, ", ");
            }else{
                resultText = originalText.replace(/\n/g, ", ");
            }
        }
        // Check if the 'Custom text' radio button is selected
        else if (custom.checked) {
            // Get the custom text entered by the user
            var customText = document.getElementById("customText").value;
            // Check if the 'Remove Duplicates' checkbox is checked
            if (removeDuplicatesCheckbox.checked) {
                originalText = removeDuplicateLines(originalText);
            }
            // Replace line breaks with custom text
            resultText = originalText.replace(/\n/g, customText);
        }
        // Check if the 'Replace line breaks with blank space' radio button is selected
        else if (breakToSpcae.checked) {
            resultText = originalText.replace(/\n/g, " ");
        }
        // Check if the 'Replace commas with blank space' radio button is selected
        else if (commaToSpace.checked) {
            resultText = originalText.replace(/,/g, " ");
        }
        // Check if the 'Add characters before and after each word' radio button is selected
        else if (document.getElementById("customWords").checked) {
            // Get the values from the 'preWord' and 'postWord' input elements
            var preWord = document.getElementById("preWord").value;
            var postWord = document.getElementById("postWord").value;

            // Check if the 'Remove Duplicates' checkbox is checked
            if (removeDuplicatesCheckbox.checked) {
                originalText = removeDuplicateLines(originalText);
            }

            // Split the text into an array of words
            var words = originalText.split(/\s+/);

            // Add characters before and after each word
            resultText = words.map(function (word) {
                return preWord + word + postWord;
            }).join("\n");
        }

        // Check if the 'Insert into IN ( )' checkbox is checked (Edit for a SQL condition)
        if (add1Checkbox.checked) {
            // If checked, wrap each original line in single quotes
            var lines = resultText.split(", ");
            resultText = lines.map((line) => "'" + line + "'").join(", ");
            // Add "IS IN" before the parentheses
            resultText = "IN (" + resultText + ")";
        }

        // Function to remove duplicate lines from a string
        function removeDuplicateLines(text) {
            var lines = text.split(/\r?\n|\r/);
            var uniqueLines = Array.from(new Set(lines));
            return uniqueLines.join("\n");
        }

        // Set the result in the 'Result' textarea
        restextTextarea.value = resultText;
    });

    // Add event listener to the 'Copy to clipboard' button
    copyButton.addEventListener("click", function () {
        // Select the text in the 'Result' textarea
        restextTextarea.select();

        // Copy the selected text to the clipboard
        document.execCommand("copy");
    });

    document.getElementById('copyright-year').innerText = new Date().getFullYear();

        // Get reference to the reset button
        var resetButton = document.getElementById("reset");

        // Add event listener to the 'Reset' button
        resetButton.addEventListener("click", function () {
            // Reload the page
            location.reload();
        });
});


/*COMPARE TEXT PAGE CODE*/

document.addEventListener("DOMContentLoaded", function () {
    var originalTextarea = document.getElementById("textOne");
    var newTextarea = document.getElementById("textTwo");
    var compareButton = document.getElementById("compareListsButton");
    var originalCard = document.getElementById("originalCard");
    var newCard = document.getElementById("newCard");

    // function highlightDifferences(originalText, newText, container) {
    //     var diffHtml = '';
    //     var wordDiff = '';
    //     var inDiff = false;
    
    //     for (var i = 0; i < newText.length; i++) {
    //         var originalChar = originalText.charAt(i);
    //         var newChar = newText.charAt(i);
    
    //         if (originalChar !== newChar) {
    //             inDiff = true;
    //             wordDiff += newChar;
    //         } else {
    //             if (inDiff) {
    //                 diffHtml += '<span class="diff-word">' + wordDiff + '</span>';
    //                 wordDiff = '';
    //                 inDiff = false;
    //             }
    //             diffHtml += originalChar;
    //         }
    //     }
    
    //     // Handle the case where the difference extends to the end of the text
    //     if (inDiff) {
    //         diffHtml += '<span class="diff-word">' + wordDiff + '</span>';
    //     }
    
    //     // Replace newline characters with <br> tags
    //     diffHtml = diffHtml.replace(/\n/g, '<br>');
    
    //     // Beautify JSON content if it is JSON
    //     try {
    //         var jsonValue = JSON.parse(diffHtml);
    //         diffHtml = JSON.stringify(jsonValue, null, 2);
    //     } catch (error) {
    //         // Ignore if not valid JSON
    //     }
    
    //     // Create a new code element
    //     var codeElement = document.createElement('pre');
    //     codeElement.className = 'card';
    //     codeElement.innerHTML = diffHtml;
    
    //     // Append the code element to the specified container
    //     container.innerHTML = '';
    //     container.appendChild(codeElement);
    // }

    // Add event listener
    compareButton.addEventListener("click", compareTexts);

    // Get reference to the clear button
    var clearButton = document.getElementById("clearButton");

    // Add event listener to the 'Clear' button
    clearButton.addEventListener("click", function () {
        // Refresh the page
        location.reload();
    });

    document.getElementById('copyright-year-compare-page').innerText = new Date().getFullYear();
    
});

/*COMPARE LISTS PAGE CODE*/


document.addEventListener("DOMContentLoaded", function () {

    var originalTextarea = document.getElementById("textOne");
    var newTextarea = document.getElementById("textTwo");
    var compareButton = document.getElementById("compareListsButton");
    var resetButton = document.getElementById("clearButton");
    var originalCard = document.getElementById("originalCard");
    var newCard = document.getElementById("newCard");

    
    function highlightDifferences(originalText, newText, container) {
        var originalLines = originalText.split('\n');
        var newLines = newText.split('\n');
        var diffHtml = '';
    
        for (var i = 0; i < Math.max(originalLines.length, newLines.length); i++) {
            var originalLine = originalLines[i] || '';
            var newLine = newLines[i] || '';
    
            if (originalLine !== newLine) {
                diffHtml += '<span class="diff-line">' + newLine + '</span>';
            } else {
                diffHtml += newLine;
            }
    
            // Add a line break after each line (except for the last line)
            if (i < Math.max(originalLines.length, newLines.length) - 1) {
                diffHtml += '<br>';
            }
        }
    
        // Beautify JSON content if it is JSON
        try {
            var jsonValue = JSON.parse(diffHtml);
            diffHtml = JSON.stringify(jsonValue, null, 2);
        } catch (error) {
            // Ignore if not valid JSON
        }
    
        // Create a new code element
        var codeElement = document.createElement('pre');
        codeElement.className = 'card';
        codeElement.innerHTML = diffHtml;
    
        // Append the code element to the specified container
        container.innerHTML = '';
        container.appendChild(codeElement);
    }

    // Function to find words in list2 but not in list1
    function findUniqueWords(list1, list2) {
        var wordsList1 = list1.split(/\s+/);
        var wordsList2 = list2.split(/\s+/);

        // Find words in list2 that are not in list1
        var uniqueWords = wordsList2.filter(function(word) {
            return wordsList1.indexOf(word) === -1;
        });

        return uniqueWords.join(', ');
    }

    function compareTexts() {
        var list1Text = originalTextarea.value;
        var list2Text = newTextarea.value;

        // Highlight differences for each card
        highlightDifferences(list1Text, list2Text, originalCard);
        highlightDifferences(list2Text, list1Text, newCard);

        // Show the cards after comparison
        originalCard.style.display = "block";
        newCard.style.display = "block";

        // Find and display unique words from List 2 in a new card
        var uniqueWords = findUniqueWords(list1Text, list2Text);
        document.getElementById("uniqueWordsCard").innerHTML = uniqueWords;
        document.getElementById("uniqueWordsCard").style.display = "block";
        document.getElementById("uniqueWordsHeader").style.display = "block";

        // Scroll to the cards area
        var cardsSection = document.querySelector('#compareListsButton');
        window.scrollTo({
            top: cardsSection.offsetTop,
            behavior: 'smooth'
        });
    }

    // Add event listener
    compareButton.addEventListener("click", compareTexts);

    resetButton.addEventListener("click", function () {
        // Reload the page
        location.reload();
    });

    // File input for Text One
    const fileInputOne = document.getElementById('fileInputOne');
    const textOneTextarea = document.getElementById('textOne');

    fileInputOne.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            readAndConvertFile(file, textOneTextarea);
        }
    });

    // File input for Text Two
    const fileInputTwo = document.getElementById('fileInputTwo');
    const textTwoTextarea = document.getElementById('textTwo');

    fileInputTwo.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            readAndConvertFile(file, textTwoTextarea);
        }
    });

    // Function to read file, convert to JSON, and set textarea value
    function readAndConvertFile(file, textarea) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            
            // Check if the file is CSV
            if (file.name.toLowerCase().endsWith('.csv')) {
                // Convert CSV to JSON
                const jsonData = convertCSVtoJSON(content);
                // Set JSON data as the value in the textarea
                textarea.value = JSON.stringify(jsonData, null, 2);
            } else {
                // If not a CSV file, set the content as is
                textarea.value = content;
            }

            // Highlight keys and values
            highlightKeysAndValues(textarea);
        };
        reader.readAsText(file);
    }

    // Function to convert CSV to JSON
    function convertCSVtoJSON(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        return result;
    }

    // Function to highlight keys and values in the textarea
    function highlightKeysAndValues(textarea) {
        const lines = textarea.value.split('\n');
        textarea.innerHTML = '';

        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                // Key
                const key = line.substring(0, colonIndex + 1);
                const restOfLine = line.substring(colonIndex + 1);
                const keyElement = document.createElement('span');
                keyElement.style.color = 'purple';
                keyElement.textContent = key;
                textarea.appendChild(keyElement);

                // Rest of the line (value)
                const valueElement = document.createElement('span');
                valueElement.style.color = 'red';
                valueElement.textContent = restOfLine;
                textarea.appendChild(valueElement);
            } else {
                // No key found, just add the line as is
                const lineElement = document.createElement('span');
                lineElement.textContent = line;
                textarea.appendChild(lineElement);
            }

            // Add a line break
            textarea.appendChild(document.createElement('br'));
        });
    }

        // Beautify button for both textareas
        var beautifyButton = document.getElementById("beautifyButton");
        beautifyButton.addEventListener("click", function () {
            beautifyJSON("textOne");
            beautifyJSON("textTwo");
        });
    
        // Function to beautify JSON in the specified textarea
        function beautifyJSON(textAreaId) {
            var textArea = document.getElementById(textAreaId);
            try {
                var jsonValue = JSON.parse(textArea.value);
                textArea.value = JSON.stringify(jsonValue, null, 2);
            } catch (error) {
                window.alert("Invalid JSON:\n\n" + error.message +"\n\nMake sure both text areas are not empty");
                // You may want to handle the case where the JSON is invalid
            }
        }

        function handleDrop(event) {
            event.preventDefault();
        
            // Access the dropped files from the DataTransfer object
            var files = event.dataTransfer.files;
        
            // You can now handle the dropped files (e.g., read their content, etc.)
            handleFiles(files);
        }
        
        function handleFiles(files) {
            // Process the dropped files
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log("Dropped file:", file.name);
                // Perform any additional actions with the dropped file
            }
        }

        document.getElementById('fileInput').addEventListener('change', handleFileChange);

});


