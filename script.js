function goTo(section) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  if (section === 'twibbon' || section === 'card') {
    document.getElementById('form-section').classList.add('active');
  } else {
    document.getElementById(`${section}-section`).classList.add('active');
  }
}

const form = document.getElementById('gradForm');
const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = form.nama.value;
  const fakultas = form.fakultas.value;
  const jurusan = form.jurusan.value;
  const kampus = form.kampus.value;
  const file = form.foto.files[0];

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = 1080;
      canvas.height = 1350;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 140, 100, 800, 800);

      ctx.font = "bold 40px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText(nama, 100, 980);
      ctx.fillText(fakultas, 100, 1040);
      ctx.fillText(jurusan, 100, 1100);
      ctx.fillText(kampus, 100, 1160);

      ctx.font = "28px 'Elise Fill', cursive";
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.textAlign = "right";
      ctx.fillText("CALILOOPS", canvas.width - 40, canvas.height - 40);

      goTo('preview');
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function downloadResult() {
  const link = document.createElement('a');
  link.download = 'caliloops_graduation_card.png';
  link.href = canvas.toDataURL();
  link.click();
}
