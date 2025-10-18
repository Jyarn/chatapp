"use strict";

function createRequest(url, formData) {
  const formProps = Object.fromEntries(formData);
  console.log(formProps);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formProps)
  })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then((response) =>
      document.querySelector("#content").innerHTML = response.response
    )
    .catch(() =>
      document.querySelector("#content").innerHTML = "Unable to sign in."
    )
}

window.onload = () => {
  document
    .querySelector("#login")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      createRequest("/users/login", new FormData(e.target));
    })

  document
    .querySelector("#signup")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      createRequest("/users/signup", new FormData(e.target));
    })
}
