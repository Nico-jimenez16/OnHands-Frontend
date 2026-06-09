'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, MapPin, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import styled from 'styled-components'
import { Input, Button, Divider, Badge } from '@/components/ui'

// NOTE: Esta pantalla usa una paleta propia (navy + blanco + ámbar) que no existe
// en src/styles/theme.ts (que es violeta/oscuro). Al ser una pantalla de marca
// autónoma, los colores se hardcodean acá y no se modifica el theme compartido.
//
// TODO(ui-library): existe una librería de componentes atómicos en
// src/components/ui (Button, Input, Text, Label, Badge, Divider, Avatar, Icon),
// pero está atada al theme oscuro. Migrar esta pantalla requeriría agregar
// overrides de color/paleta a esos componentes para preservar el look claro/ámbar.
// Hasta entonces el login conserva sus styled-components propios para mantener
// la apariencia idéntica.

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background: #f4f4f6;
`

const Left = styled.div`
  position: relative;
  overflow: hidden;
  background: #1a1a2e;
  padding: 40px 44px;
  display: flex;
  flex-direction: column;
`

const LeftTop = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: auto;
`

const LogoDot = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ef9f27;
`

const LogoName = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #e8e8f8;
  letter-spacing: -0.3px;
`

const DotGrid = styled.div`
  position: absolute;
  top: 38px;
  right: 40px;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(5, 3px);
  gap: 7px;
`

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`

const LeftBody = styled.div`
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 0 40px;
`

const AccentBar = styled.div`
  width: 36px;
  height: 3px;
  background: #ef9f27;
  border-radius: 2px;
  margin-bottom: 14px;
`

const Eyebrow = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: #ef9f27;
  font-weight: 500;
  margin-bottom: 18px;
`

const LeftTitle = styled.h1`
  font-size: 38px;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.12;
  letter-spacing: -0.8px;
  margin-bottom: 18px;

  span {
    color: #ef9f27;
  }
`

const LeftDesc = styled.p`
  font-size: 14px;
  color: #8888aa;
  line-height: 1.75;
  max-width: 290px;
  margin-bottom: 40px;
`

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const FeatureIcon = styled.div`
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`

const FeatureTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #c8c8e8;
`

const FeatureSub = styled.div`
  font-size: 12px;
  color: #666680;
  line-height: 1.5;
`

const DecoCircle1 = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.04);
  bottom: -80px;
  right: -80px;
  pointer-events: none;
`

const DecoCircle2 = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  bottom: -30px;
  right: -30px;
  pointer-events: none;
`

const DecoCircle3 = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(239, 159, 39, 0.06);
  bottom: 20px;
  right: 20px;
  pointer-events: none;
`

const Right = styled.div`
  background: #ffffff;
  border-left: 1px solid #e8e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 44px;
`

const FormWrap = styled.div`
  width: 100%;
  max-width: 320px;
`

const TopBadge = styled(Badge)`
  margin-bottom: 20px;
`

const FormEyebrow = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #aaaabc;
  font-weight: 500;
  margin-bottom: 8px;
`

const FormTitle = styled.h2`
  font-size: 23px;
  font-weight: 500;
  color: #1a1a2e;
  letter-spacing: -0.4px;
  margin-bottom: 5px;
`

const FormSub = styled.div`
  font-size: 13px;
  color: #8888a0;
  margin-bottom: 30px;
  line-height: 1.5;
`

const Field = styled.div`
  margin-bottom: 14px;
`

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`

const RowBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`

const Remember = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`

const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  border: 1px solid #d0d0e0;
  border-radius: 3px;
  background: #f8f8fc;
  flex-shrink: 0;
`

const RememberLabel = styled.span`
  font-size: 12px;
  color: #8888a0;
`

const Forgot = styled.span`
  font-size: 12px;
  color: #ef9f27;
  font-weight: 500;
  cursor: pointer;
`

const SubmitButton = styled(Button)`
  margin-bottom: 18px;
`

const GoogleBtn = styled(Button)`
  margin-bottom: 18px;
`

const GoogleG = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #ef9f27;
`

const FormFooter = styled.div`
  text-align: center;
  font-size: 11.5px;
  color: #a0a0b8;
  line-height: 1.6;
`

const FooterLink = styled.span`
  color: #ef9f27;
  cursor: pointer;
  font-weight: 500;
`

const RegisterLink = styled.span`
  color: #ef9f27;
  cursor: pointer;
  font-weight: 500;
`

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const goHome = (): void => {
    router.push('/app')
  }

  return (
    <Page>
      <Left>
        <DotGrid>
          {Array.from({ length: 25 }).map((_, i) => (
            <Dot key={i} />
          ))}
        </DotGrid>

        <LeftTop>
          <LogoDot />
          <LogoName>OnHands</LogoName>
        </LeftTop>

        <LeftBody>
          <AccentBar />
          <Eyebrow>Plataforma de servicios</Eyebrow>
          <LeftTitle>
            El profesional que necesitás, cuando lo <span>necesitás.</span>
          </LeftTitle>
          <LeftDesc>
            Describí el problema en lenguaje natural y nuestro asistente encuentra al profesional
            ideal para vos.
          </LeftDesc>

          <FeatureList>
            <Feature>
              <FeatureIcon>
                <Bot size={14} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Asistente con IA</FeatureTitle>
                <FeatureSub>Entendemos lo que necesitás sin formularios complicados</FeatureSub>
              </FeatureText>
            </Feature>

            <Feature>
              <FeatureIcon>
                <MapPin size={14} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Profesionales cerca tuyo</FeatureTitle>
                <FeatureSub>Matching automático por zona, horario y especialidad</FeatureSub>
              </FeatureText>
            </Feature>

            <Feature>
              <FeatureIcon>
                <ShieldCheck size={14} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Verificados y calificados</FeatureTitle>
                <FeatureSub>Cada profesional es evaluado por la comunidad</FeatureSub>
              </FeatureText>
            </Feature>
          </FeatureList>
        </LeftBody>

        <DecoCircle1 />
        <DecoCircle2 />
        <DecoCircle3 />
      </Left>

      <Right>
        <FormWrap>
          <TopBadge variant="default" dot rounded>
            +2.400 profesionales disponibles
          </TopBadge>

          <FormEyebrow>Bienvenido de nuevo</FormEyebrow>
          <FormTitle>Ingresá a tu cuenta</FormTitle>
          <FormSub>
            ¿No tenés cuenta? <RegisterLink onClick={goHome}>Registrate gratis</RegisterLink>
          </FormSub>

          <Field>
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={14} />}
              fullWidth
            />
          </Field>

          <Field>
            <Input
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={14} />}
              rightIcon={
                <ToggleButton
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </ToggleButton>
              }
              fullWidth
            />
          </Field>

          <RowBetween>
            <Remember>
              <CheckBox />
              <RememberLabel>Recordarme</RememberLabel>
            </Remember>
            <Forgot>¿Olvidaste tu contraseña?</Forgot>
          </RowBetween>

          <SubmitButton
            variant="primary"
            type="button"
            fullWidth
            leftIcon={<ArrowRight size={14} />}
            onClick={goHome}
          >
            Ingresar
          </SubmitButton>

          <Divider label="o continuá con" />

          <GoogleBtn
            variant="secondary"
            type="button"
            fullWidth
            leftIcon={<GoogleG>G</GoogleG>}
            onClick={goHome}
          >
            Continuar con Google
          </GoogleBtn>

          <FormFooter>
            Al ingresar aceptás los <FooterLink>Términos</FooterLink> y la{' '}
            <FooterLink>Política de privacidad</FooterLink>
          </FormFooter>
        </FormWrap>
      </Right>
    </Page>
  )
}
