import "./styles/Module.Contacto.css";

function Contacto() {
    return (
        <>
            <div className="contact-container">
                <div className="contact-form">
                    <h1>¡Contáctanos!</h1>
                    <p>
                        Rellena nuestro formulario y nos pondremos en contacto contigo lo antes posible.
                    </p>
                    <form>
                        <input type="email" placeholder="Email" required />
                        <input type="text" placeholder="Asunto" required />
                        <textarea placeholder="Descripción" required></textarea>
                        <label className="checkbox-container">
                            <input type="checkbox" required />
                            He leído y acepto la <a href="#privacidad">Política de privacidad</a>
                        </label>
                        <button type="submit">Enviar comentario</button>
                    </form>
                </div>
                <div className="contact-location">
                    <h2>Localízanos</h2>
                    <p>Calle París 5, Polígono Industrial San Luis. 29006 Málaga</p>
                    <p>Tlf: <a href="tel:951220300">971 220 300</a></p>
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6397.8886064850085!2d-4.475449724359671!3d36.699876272275965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f7564ed19de3%3A0xdcd79175113453f6!2sC.%20Par%C3%ADs%2C%205%2C%20Cruz%20de%20Humilladero%2C%2029006%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1733765032739!5m2!1ses!2ses" 
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    ></iframe>
                    <p>
                        <strong>Horario de atención al público</strong><br />
                        Mañanas de Lunes a Viernes <strong>8:30 - 15:00</strong>
                    </p>
                </div>
            </div>
        </>
    );

}
export default Contacto;