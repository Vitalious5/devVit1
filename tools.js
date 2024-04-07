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
    var compareButton = document.getElementById("compareButton");
    var originalCard = document.getElementById("originalCard");
    var newCard = document.getElementById("newCard");

    function highlightDifferences(originalText, newText, card) {
        var diffHtml = '';
        for (var i = 0; i < newText.length; i++) {
            var originalChar = originalText.charAt(i);

            if (originalChar !== newText.charAt(i)) {
                diffHtml += '<span class="diff-char">' + newText.charAt(i) + '</span>';
            } else {
                diffHtml += originalChar;
            }
        }

        // Replace newline characters with <br> tags
        diffHtml = diffHtml.replace(/\n/g, '<br>');

        card.innerHTML = diffHtml;
    }

    function compareTexts() {
        var originalText = originalTextarea.value;
        var newText = newTextarea.value;

        // Highlight differences for each card
        highlightDifferences(originalText, newText, originalCard);
        highlightDifferences(newText, originalText, newCard);

        // Show the cards after comparison
        originalCard.style.display = "block";
        newCard.style.display = "block";
    }

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

    
    function highlightDifferences(originalText, newText, card) {
        var diffHtml = '';
        for (var i = 0; i < newText.length; i++) {
            var originalChar = originalText.charAt(i);

            if (originalChar !== newText.charAt(i)) {
                diffHtml += '<span class="diff-char">' + newText.charAt(i) + '</span>';
            } else {
                diffHtml += originalChar;
            }
        }

        // Replace newline characters with <br> tags
        diffHtml = diffHtml.replace(/\n/g, '<br>');

        card.innerHTML = diffHtml;
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
    }

    // Add event listener
    compareButton.addEventListener("click", compareTexts);

    resetButton.addEventListener("click", function () {
        // Reload the page
        location.reload();
    });
    
});