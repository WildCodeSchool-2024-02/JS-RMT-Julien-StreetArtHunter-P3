

function FormRegister() {
  const handleSubmit = async event => {
    event.preventDefault();

  }
  return (
    <main className="form-register">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Pseudo
            <input
              type="text"
              name="pseudo"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              name="password"
            />
          </label>
          <label>
            Confirmation de Mot Passe
            <input
              type="password"
              name="password"
            />
          </label>
        </div>
        <div className="inscription-button">
          <button className="button" type="button">
            S'inscrire
          </button>
        </div>
      </form>
    </main>
  );
}


export default FormRegister;