import React, { useState } from "react";

import "./TomarHora.css";

const especialidades = [
  {
    especialidad: "Otorrinolaringología",
    elementos: [
      {
        centro: "Centro 1",
        direccion: "Dirección 1",
      },
      {
        centro: "Centro 2",
        direccion: "Dirección 2",
      },
      {
        centro: "Centro 3",
        direccion: "Dirección 3",
      },
    ],
  },
  {
    especialidad: "Medico general",
    elementos: [
      {
        centro: "Centro 6",
        direccion: "Dirección medico 1",
      },
      {
        centro: "Centro 2",
        direccion: "Dirección 2",
      },
      {
        centro: "Centro 3",
        direccion: "Dirección 3",
      },
    ],
  },
  {
    especialidad: "Kine",
    elementos: [
      {
        centro: "Centro 6",
        direccion: "Dirección medico 1",
      },
    ],
  },

  // Otros elementos de especialidades
];


function ViewTomarHora() {
	const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = "./elegir_medico.html";
  };
    return (
        <html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="" />
    <title>Dashboard Template · Bootstrap</title>

    <link href="index.css" rel="stylesheet" />
    <link
      rel="canonical"
      href="https://v5.getbootstrap.com/docs/5.0/examples/dashboard/"
    />

    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
      integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
      crossOrigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossOrigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/js/bootstrap.min.js"
      integrity="sha384-oesi62hOLfzrys4LxRF63OJCXdXDipiYWBnvTl9Y9/TRlw5xlKIEHpNyvvDShgf/"
      crossOrigin="anonymous"
    ></script>

    
  </head>

  <body>

    <div className="container-fluid">
      <div className="row">

        <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <h1 className="h2">Tomar Hora</h1>
          </div>
        </main>
      </div>
    </div>

    
    <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4" style={{padding: "20px"}}>

    
      <h2 style={{margin: 10}}>
  <span style={{marginRight: "110px"}}>Especialidad</span>
  Centros
</h2>
   {/*Primer elemento del acordeón */}
   {especialidades.map((especialidad, index) => (
  <div key={index}>
    <button
      className={`accordion ${activeAccordion === index ? "active" : ""}`}
      onClick={() => toggleAccordion(index)}
    >
      <span className="arrow">{activeAccordion === index ? "▼" : "▲"}</span>
      {especialidad.especialidad}
      <span className="icono"></span>
    </button>
    <div className={`panel ${activeAccordion === index ? "show" : ""}`}>
      <ul className="lista">
        {especialidad.elementos.map((elemento, subIndex) => (
          <li key={subIndex}>
            <div className="centro">{elemento.centro}</div>
            <div className="direccion">{elemento.direccion}</div>
            <a href="#" className="icono buscar" onClick={handleSearchClick}>
              <i className="fas fa-search"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
))}

</main>
  <script>{`
          // JavaScript para manejar el acordeón
          var acc = document.querySelectorAll(".accordion");

          for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
              this.classList.toggle("active");
              var panel = this.nextElementSibling;
              if (panel && panel.style.display === "block") {
                panel.style.display = "none";
                this.querySelector('.arrow').innerHTML = '&#9660;';
              } else if (panel) {
                panel.style.display = "block";
                this.querySelector('.arrow').innerHTML = '&#9650;';
              }
            });
          }

          var links = document.querySelectorAll(".buscar");

          links.forEach(function(link) {
            link.addEventListener("click", function(event) {
              event.preventDefault();
              window.location.href = "./elegir_medico.html";
            });
          });
          `}
  </script>
  </body>
</html>

    );
  }
  
  export default ViewTomarHora;
