let concatenatedMessages = ''; // Placeholder for storing the concatenated messages

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  document.getElementById('dropArea').addEventListener(eventName, preventDefaults, false);
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
});

// Highlight drop area when dragging files over it
['dragenter', 'dragover'].forEach(eventName => {
  document.getElementById('dropArea').addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach(eventName => {
  document.getElementById('dropArea').addEventListener(eventName, unhighlight, false);
});

function highlight() {
  document.getElementById('dropArea').style.backgroundColor = '#f0f0f0'; // Example style
}

function unhighlight() {
  document.getElementById('dropArea').style.backgroundColor = ''; // Reset style
}

// Handle dropped files
document.getElementById('dropArea').addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  if(files.length > 0) {
    // Replace drop area content with the file name
    document.getElementById('dropArea').textContent = `File dropped: ${files[0].name}`;
  }

  handleFiles(files);
}


function handleFiles(files) {
  const file = files[0];
  processFile(file); // Process the file
}

function processFile(file) {
  if (!file) {
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const originalJson = JSON.parse(e.target.result);
      concatenatedMessages = originalJson.map(item => item.text.message
          .replace(/\[\d+\]/g, '') // Remove square brackets and numbers
          .replace(/\\\"/g, '"') // Unescape quotation marks
          .replace(/\\/g, '') // Remove all backslashes
          .trim())
          .join(' ');

      document.getElementById('processButton').disabled = false;
    } catch(error) {
      console.error('Error parsing JSON file', error);
    }
  };

  reader.readAsText(file);
}

document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  processFile(file);
});

document.getElementById('processButton').addEventListener('click', function() {
    document.getElementById('resultBox').value = concatenatedMessages;
    document.getElementById('copyButtonJSON').disabled = false;
    
    // Update the action status text
    document.getElementById('actionStatus').textContent = 'File processed successfully!';

    // Inside your processButton click event, after setting the textContent
    setTimeout(() => {
        document.getElementById('actionStatus').textContent = '';
    }, 5000); // Clears the message after 5 seconds

});


document.getElementById('copyButtonJSON').addEventListener('click', function() {
    const textArea = document.createElement('textarea');
    textArea.value = document.getElementById('resultBox').value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        // Assuming the copy was successful
        document.getElementById('copyStatus').textContent = 'Copied to clipboard successfully!';
    } catch (err) {
        console.error('Unable to copy', err);
        // Inform the user if the copy was unsuccessful
        document.getElementById('copyStatus').textContent = 'Failed to copy to clipboard.';
    }
    document.body.removeChild(textArea);

    // Optionally, clear the message after a few seconds
    setTimeout(() => {
        document.getElementById('copyStatus').textContent = '';
    }, 5000); // Clears the message after 5 seconds
});


document.getElementById('clearFileButton').addEventListener('click', function() {
    // Clear the file input
    document.getElementById('dropArea').innerHTML = 'In Coralogix, select the "message" column only for the logs, then extract the data as JSON file <br> <br> Drag and drop the JSON file here or click to select a file.<br> <br><input type="file" id="fileInput">';

    // Clear the result box
    document.getElementById('resultBox').value = '';
    // Disable buttons again
    document.getElementById('processButton').disabled = true;
    document.getElementById('copyButtonJSON').disabled = true;
    // Reset any other UI elements or variables as needed
    concatenatedMessages = '';
    // Optional: Reset drop area styling if you're using styling to indicate file is ready for processing
    document.getElementById('dropArea').style.backgroundColor = ''; // Reset style if you were changing it

    // Update the clear action status text
    document.getElementById('clearStatus').textContent = 'Content cleared successfully!';

    setTimeout(() => {
        document.getElementById('clearStatus').textContent = '';
    }, 5000); // Clears the message after 5 seconds
    
});

document.getElementById('prettifyButtonJSON').addEventListener('click', function() {
    const resultBox = document.getElementById('resultBox');
    try {
        // Parse the JSON text from the textarea to an object
        const json = JSON.parse(resultBox.value);
        // Stringify the JSON object with indentation (e.g., 2 spaces)
        const prettyJson = JSON.stringify(json, null, 2);
        // Update the textarea with the formatted JSON string
        resultBox.value = prettyJson;
        
        // Update the prettify action status text
        document.getElementById('prettifyStatus').textContent = 'JSON prettified successfully!';
    } catch (error) {
        console.error('Error prettifying JSON', error);
        // Optionally, inform the user if the JSON is not valid or prettifying failed
        document.getElementById('prettifyStatus').textContent = 'Failed to prettify JSON. Please ensure it is valid JSON.';
    }

    setTimeout(() => {
        document.getElementById('prettifyStatus').textContent = '';
    }, 5000); // Clears the message after 5 seconds
    
});

