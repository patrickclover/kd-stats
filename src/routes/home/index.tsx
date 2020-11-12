import { Heading, HStack, Stack } from '@chakra-ui/core'
import { FunctionalComponent, h } from 'preact'
import User from '../../components/user/user'
import kdHook from '../../hooks/kdHook'
import * as style from './style.css'

const Home: FunctionalComponent = () => {
  const patrick = kdHook('playbyclover')
  const joe = kdHook('josefbenassi%237491959', 'atvi')
  const lewis = kdHook('lewisjblyth1')
  const jamie = kdHook('jamiemalcolm04')
  return (
    <div class={style.home}>
      <Stack spacing={3}>
        <Heading>KD Scoreboard</Heading>
        <HStack spacing={3}>
          <User kd={patrick} />
          <User kd={joe} />
          <User kd={lewis} />
          <User kd={jamie} />
        </HStack>
      </Stack>
    </div>
  )
}

export default Home
