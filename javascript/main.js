function generateQRCode() {
  const text = document.getElementById('text-input').value;
  if (!text) {
    alert('Please enter text to generate a QR code.');
    return;
  }
  QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
    if (err) {
      console.error(err);
      return;
    }
    document.getElementById('qrcode').src = url;
    document.getElementById('qrcode').style.display = 'block';
  });
}

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');

dropzone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
});

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.remove('dragover');

    const file = event.dataTransfer.files[0];
    if (file) {
        handleFile(file);
    }
});

function handleFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.getElementById('qr-canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const decoded = jsQR(imageData.data, canvas.width, canvas.height);
            if (decoded) {
                document.getElementById('result').innerText = `Decoded Text: ${decoded.data}`;
            } else {
                document.getElementById('result').innerText = 'No QR code found.';
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

