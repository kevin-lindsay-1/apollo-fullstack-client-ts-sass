import React, { ChangeEvent, Component, FormEvent } from 'react';
import { ReactComponent as Curve } from '../../assets/curve.svg';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Rocket } from '../../assets/rocket.svg';
import Button from '../button';
import styles from './styles.module.scss';

interface IProps {
  login?(args: object): void;
}

interface IState {
  email: string;
}

export default class LoginForm extends Component<IProps, IState> {
  public onChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.value) {
      const email = target.value;
      this.setState({ email });
    }
  };

  public onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (this.props.login) {
      this.props.login({ variables: { email: this.state.email } });
    }
  };

  public render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <Curve className={styles.curve} />
          <Logo className={styles.logo} />
        </header>
        <Rocket className={styles.rocket} />
        <h1 className={styles.heading}>Space Explorer</h1>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <input
            className={styles.input}
            required
            type="email"
            name="email"
            placeholder="Email"
            data-testid="login-input"
            onChange={this.onChange}
          />
          <Button type="submit">Log in</Button>
        </form>
      </div>
    );
  }
}
