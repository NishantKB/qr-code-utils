function generateQRCode() {
    const text = document.getElementById('text-input').value;
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
      if (err) {
        console.error(err);
        return;
      }
      const qrcodeImg = document.getElementById('qrcode');
      qrcodeImg.src = url;
      qrcodeImg.style.display = 'block'; 
    });
  }
  