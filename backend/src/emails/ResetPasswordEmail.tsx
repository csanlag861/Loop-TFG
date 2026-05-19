import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';

interface ResetPasswordProps {
  resetLink: string;
}

export const ResetPasswordEmail = ({ resetLink }: ResetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Preview>Recupera tu contraseña de Loop</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'sans-serif' }}>
        <Container
          style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}
        >
          <Heading style={{ color: '#171717', fontSize: '24px' }}>Loop</Heading>
          <Text style={{ color: '#525252', fontSize: '16px' }}>
            Hemos recibido una solicitud para restablecer la contraseña de tu
            cuenta.
          </Text>
          <Section
            style={{
              textAlign: 'center',
              marginTop: '32px',
              marginBottom: '32px',
            }}
          >
            <Link
              href={resetLink}
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Restablecer Contraseña
            </Link>
          </Section>
          <Text style={{ color: '#525252', fontSize: '14px' }}>
            Si no solicitaste este cambio, puedes ignorar este correo. Este
            enlace caducará en 30 minutos.
          </Text>
          <Hr style={{ borderColor: '#e5e5e5', margin: '20px 0' }} />
        </Container>
      </Body>
    </Html>
  );
};
