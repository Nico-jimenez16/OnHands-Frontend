import styled from 'styled-components'
import { light } from './palette'

export const Shell = styled.div`
  display: grid;
  grid-template-rows: 52px 1fr;
  grid-template-columns: 220px 1fr 280px;
  height: 100vh;
  overflow: hidden;
  background: ${light.bg};
`
