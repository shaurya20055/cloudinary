const form = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'slaveshadow');
  const cloudName = 'dtcp4q07z'; 
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    resultDiv.innerHTML = `
      <p>Uploaded Successfully! URL:</p>
      <a href="${data.secure_url}" target="_blank">${data.secure_url}</a>
      <br />
      <img src="${data.secure_url}" alt="Uploaded Image" />
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">Upload failed. Try again.</p>`;
    console.error(err);
  }
});
