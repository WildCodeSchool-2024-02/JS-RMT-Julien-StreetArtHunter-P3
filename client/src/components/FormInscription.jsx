

function FormInscription() {
  const handleSubmit = async event => {
    event.preventDefault();

  }
  return (
    <main className="form-inscription">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Pseudo
            <input
              type="text"
              placeholder="Pseudo"
              name="pseudo"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              name="email"
            />
          </label>
          <label>
            Pseudo
            <input
              type="text"
              placeholder="Pseudo"
              name="pseudo"
            />
          </label>
        </div>

      </form>
    </main>
  );
}


export default FormInscription;