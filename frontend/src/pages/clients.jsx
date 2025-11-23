import React from "react";
import "../pages/clients.css";


const clients = [
  "Apollo.png", "ANAND.png","Ashok-Leyland.png",
  "ball.jpg", "birla.png","bridgestone.webp", "bunge.png", "butterfly.png",
  "bmw.jpg", "blue-star.png", "Bosch.png", "bonfiglioli.jpg",
  "coca-cola.png","Cholayil.jpg",
  "Danieli.webp", "dixon.png", "Dmart.png", "dorma.png", 
  "eaton.png", "emerson.png", 
  "flextronics.jpg","delfingen.png","htl.png","inovance.svg","ljungstrom.png",
  "motherson.png","nipponseiki.png","ojipacking.png","rosti.svg","slcorporation.png",
  "sparkminda.png","sterblum.jpg","suspa.png","unominda.png","wilson.png",
  "greenpay.png", "grt.png", "Gurit.png",
  "hyundai.png", "husky.png", "hospira.png", "HUL.png", "hatsun.png",
  "icici.jpg", "itc.png" ,"itw.png",
  "johnson-controls.png","Jost.png",
  "kubota.png","KJLNEW.png",
  "lnt.png", "lmw.png", "lear.png", "lotte.png", "Lohmann.png",
  "michelin.png",  "MRF.png", "mahindra.jpg","mitsubishi.png","murugappa.png", "modine.png","mclube.jpg", "mgm.jpg",
  "nippon.webp", "newell.png",
  "panasonic.png", "perfetti.png","pepsico.png", "pilkington.png",
  "roca.png", "reynolds.png", "rane.png", "rrd.png", 
  "sona.jpg",  "star-health.png", "sanmar.png","suzlon.png","schwing.png", "samsung.webp",
  "toshiba.png","triumph.png","tata.png", "tvs.jpg", 
  "valeo.png", "voss.png", 
  "world-vision.png", 
  "yamaha.png", "yanmar.png",
  "zf.png"
];

const OurClients = () => {
  return (
    <section className="clients-section">
      <h2 className="section-title">Some of Our Clients</h2>
      <div className="clients-grid">
        {clients.map((client, i) => (
          <div className="client-card" key={i}>
            <img src={`/clients/${client}`} alt={client} />

          </div>
        ))}
      </div>
    </section>
  );
};

export default OurClients;
