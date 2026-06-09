'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, MapPin, ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import styled from 'styled-components'

// NOTE: Esta pantalla usa una paleta ámbar/oscura propia que no existe en
// src/styles/theme.ts (que es violeta). Al ser una pantalla de marca autónoma,
// los colores se hardcodean acá y no se modifica el theme compartido.

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  background: #080808;
`

const Left = styled.div`
  position: relative;
  background: #080808;
  padding: 40px 44px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #141414;
`

const LeftTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  color: #c0c0c0;
  letter-spacing: -0.3px;
`

const DotGrid = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  display: grid;
  grid-template-columns: repeat(5, 3px);
  gap: 6px;
`

const Dot = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #141414;
`

const LeftBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AccentBar = styled.div`
  width: 32px;
  height: 3px;
  background: #ef9f27;
  border-radius: 2px;
  margin-bottom: 12px;
`

const Eyebrow = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #ef9f27;
  font-weight: 500;
  margin-bottom: 16px;
`

const LeftTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: #e8e8e8;
  line-height: 1.15;
  letter-spacing: -0.8px;
  margin-bottom: 16px;

  span {
    color: #ef9f27;
  }
`

const LeftText = styled.p`
  font-size: 14px;
  color: #383838;
  line-height: 1.7;
  max-width: 300px;
  margin-bottom: 36px;
`

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`

const FeatureIcon = styled.div`
  width: 28px;
  height: 28px;
  background: #141414;
  border: 1px solid #1e1e1e;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const FeatureTitle = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  color: #505050;
`

const FeatureSub = styled.div`
  font-size: 11.5px;
  color: #2a2a2a;
  line-height: 1.4;
`

const LeftFoot = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #141414;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #606060;
  letter-spacing: -0.4px;
`

const StatLabel = styled.div`
  font-size: 10px;
  color: #282828;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`

const StatSep = styled.div`
  width: 1px;
  height: 28px;
  background: #191919;
`

const CornerDeco = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
  border-top-left-radius: 120px;
  border: 1px solid #141414;
  pointer-events: none;
`

const CornerDeco2 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70px;
  height: 70px;
  border-top-left-radius: 70px;
  border: 1px solid #191919;
  pointer-events: none;
`

const Right = styled.div`
  background: #080808;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 44px;
`

const FormWrap = styled.div`
  width: 100%;
  max-width: 320px;
`

const FormEyebrow = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #303030;
  font-weight: 500;
  margin-bottom: 8px;
`

const FormTitle = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #d8d8d8;
  letter-spacing: -0.4px;
  margin-bottom: 4px;
`

const FormSub = styled.div`
  font-size: 13px;
  color: #303030;
  margin-bottom: 32px;
  line-height: 1.5;
`

const Field = styled.div`
  margin-bottom: 16px;
`

const FieldLabel = styled.label`
  display: block;
  font-size: 11.5px;
  color: #404040;
  font-weight: 500;
  letter-spacing: 0.2px;
  margin-bottom: 6px;
`

const FieldInput = styled.div`
  background: #0e0e0e;
  border: 1px solid #1e1e1e;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.15s;

  &:focus-within {
    border-color: #2a1f00;
  }
`

const Input = styled.input`
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: #c0c0c0;

  &::placeholder {
    color: #252525;
  }
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
  margin-bottom: 24px;
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
  border: 1px solid #2a2a2a;
  border-radius: 3px;
  background: #0e0e0e;
  flex-shrink: 0;
`

const RememberLabel = styled.span`
  font-size: 12px;
  color: #303030;
`

const Forgot = styled.span`
  font-size: 12px;
  color: #504030;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #ef9f27;
  }
`

const PrimaryButton = styled.button`
  width: 100%;
  padding: 11px;
  background: #ef9f27;
  border: none;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  color: #080808;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-bottom: 20px;
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`

const DivLine = styled.div`
  flex: 1;
  height: 1px;
  background: #141414;
`

const DivText = styled.span`
  font-size: 11px;
  color: #252525;
`

const GoogleButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #0e0e0e;
  border: 1px solid #1e1e1e;
  border-radius: 9px;
  font-size: 13px;
  color: #404040;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`

const GoogleG = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #ef9f27;
`

const FormFooter = styled.div`
  text-align: center;
  font-size: 12px;
  color: #282828;
`

const FooterLink = styled.span`
  color: #ef9f27;
  cursor: pointer;
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
          <LeftText>
            Describí el problema en lenguaje natural y nuestro asistente encuentra al profesional
            ideal para vos.
          </LeftText>

          <FeatureList>
            <Feature>
              <FeatureIcon>
                <Bot size={13} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Asistente con IA</FeatureTitle>
                <FeatureSub>Entendemos lo que necesitás sin formularios complicados</FeatureSub>
              </FeatureText>
            </Feature>

            <Feature>
              <FeatureIcon>
                <MapPin size={13} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Profesionales cerca tuyo</FeatureTitle>
                <FeatureSub>Matching automático por zona, horario y especialidad</FeatureSub>
              </FeatureText>
            </Feature>

            <Feature>
              <FeatureIcon>
                <ShieldCheck size={13} color="#ef9f27" />
              </FeatureIcon>
              <FeatureText>
                <FeatureTitle>Verificados y calificados</FeatureTitle>
                <FeatureSub>Cada profesional es evaluado por la comunidad</FeatureSub>
              </FeatureText>
            </Feature>
          </FeatureList>
        </LeftBody>

        <LeftFoot>
          <Stat>
            <StatValue>+2.400</StatValue>
            <StatLabel>profesionales</StatLabel>
          </Stat>
          <StatSep />
          <Stat>
            <StatValue>98%</StatValue>
            <StatLabel>satisfacción</StatLabel>
          </Stat>
          <StatSep />
          <Stat>
            <StatValue>&lt; 15min</StatValue>
            <StatLabel>tiempo respuesta</StatLabel>
          </Stat>
        </LeftFoot>

        <CornerDeco />
        <CornerDeco2 />
      </Left>

      <Right>
        <FormWrap>
          <FormEyebrow>Bienvenido de nuevo</FormEyebrow>
          <FormTitle>Ingresá a tu cuenta</FormTitle>
          <FormSub>
            ¿No tenés cuenta? <RegisterLink onClick={goHome}>Registrate gratis</RegisterLink>
          </FormSub>

          <Field>
            <FieldLabel>Correo electrónico</FieldLabel>
            <FieldInput>
              <Mail size={14} color="#252525" />
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FieldInput>
          </Field>

          <Field>
            <FieldLabel>Contraseña</FieldLabel>
            <FieldInput>
              <Lock size={14} color="#252525" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ToggleButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <EyeOff size={14} color="#252525" />
                ) : (
                  <Eye size={14} color="#252525" />
                )}
              </ToggleButton>
            </FieldInput>
          </Field>

          <RowBetween>
            <Remember>
              <CheckBox />
              <RememberLabel>Recordarme</RememberLabel>
            </Remember>
            <Forgot>¿Olvidaste tu contraseña?</Forgot>
          </RowBetween>

          <PrimaryButton type="button" onClick={goHome}>
            <ArrowRight size={14} />
            Ingresar
          </PrimaryButton>

          <Divider>
            <DivLine />
            <DivText>o continuá con</DivText>
            <DivLine />
          </Divider>

          <GoogleButton type="button" onClick={goHome}>
            <GoogleG>G</GoogleG>
            Continuar con Google
          </GoogleButton>

          <FormFooter>
            Al ingresar aceptás los <FooterLink>Términos</FooterLink> y la{' '}
            <FooterLink>Política de privacidad</FooterLink>
          </FormFooter>
        </FormWrap>
      </Right>
    </Page>
  )
}
