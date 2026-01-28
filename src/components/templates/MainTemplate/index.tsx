import { Container } from '../../Container';
import { Footer } from '../../Footer';
import { Logo } from '../../Logo';
import { Menu } from '../../Menu';

type MainTempleteProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTempleteProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
