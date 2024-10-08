async function get() {
  const data = await fetch(
    "http://localhost:80/wordpress/wp-json/wp/v2/posts/"
  );
  const json = await data.json();

  console.log(json);

  for (let i in json) {
    const li = document.createElement("li");
    li.innerHTML = json[i].title.rendered;

    document.querySelector("#lista").appendChild(li);
  }

  for (let i in json) {
    const div = document.createElement("div");
    div.classList.add("divy");

    const p = document.createElement("p");
    p.innerHTML = json[i].title.rendered;

    const publish = document.createElement("button");
    publish.innerHTML = "publish";

    const pending = document.createElement("button");
    pending.innerHTML = "pending";
    pending.addEventListener("click", () => {
      changeStatus(json[i].id, "pending");
    });

    div.appendChild(p);
    div.appendChild(publish);
    div.appendChild(pending);
    document.querySelector("body").appendChild(div);
  }
}

async function changeStatus(id, status) {
  const url = new URL(
    `http://localhost:80/wordpress/wp-json/wp/v2/posts/${id}`
  );

  const params = {
    status: status,
  };

  for (let i in params) {
    url.searchParams.append(i, params[i]);
  }

  console.log(url);

  const data = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Basic ${btoa("Maks:zaq12wsx")}`,
    },
  });
}

get();
