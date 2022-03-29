import styles from './Register.module.css'


function Register() {


  return (
    <form className={styles['signup-form']}>
      <h2>Register</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          value=""
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
        />
      </label>
      <label>
        <span>username:</span>
        <input
          type="text"
        />
      </label>
      <label>
        <span>Profile Photo:</span>
        <input
          type="file"
        //onChange={(e) => setUsername(e.target.value)}
        //value={username}
        />
      </label>
      <button className="btn">Register</button>
    </form>
  )
}

export default Register;
