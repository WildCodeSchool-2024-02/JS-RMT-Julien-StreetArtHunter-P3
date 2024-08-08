function FormRegister() {
  const handleSubmit = async event => {
    event.preventDefault();

  };
  return (
    <main className="form-register">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="user-info">
            <label htmlFor="pseudo">
              Pseudo
            </label>
            <input
              type="text"
              name="pseudo"
            />
            <label htmlFor="email">
              Email </label>
            <input
              type="email"
              name="email"
            />
          </div>
          <div className="user-password">
            <label htmlFor="password">
              Mot de passe </label>
            <input
              type="password"
              name="password"
            />
          </div>
          <div className="user-password">
            <label htmlFor="password_confirmation">
              Confirmation de Mot Passe </label>
            <input
              type="password"
              name="password"
            />
          </div>
        </div>
        <div className="register-button">
          <button className="button" type="button">S'inscrire
          </button>
        </div>
      </form>
    </main>
  );
}


export default FormRegister;