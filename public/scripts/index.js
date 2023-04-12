const form = document.forms["mail-form"];

const sendData = async (data) => {
  try {
    const response = await fetch("/api/v1/email", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw response;
    alert("Email sent!");
  } catch (err) {
    console.log(err);
    alert("Error!");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);
  sendData(data);
  form.reset();
});
