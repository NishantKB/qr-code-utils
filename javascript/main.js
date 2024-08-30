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
    });
}