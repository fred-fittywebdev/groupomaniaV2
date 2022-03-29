import styles from './Login.module.css'

function Login() {

  return (
    <form className={styles['login-form']}>
      <h2>login</h2>
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
          value=""
        />
      </label>
      <button className="btn">Login</button>


    </form>
  )
}

export default Login;
