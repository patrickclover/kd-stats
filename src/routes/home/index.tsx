import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Select,
  Stack,
} from '@chakra-ui/core'
import { FunctionalComponent, h } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import { KD, Segment } from '../../@types/kd.type'
import User from '../../components/user/user'
import kdHook from '../../hooks/kdHook'
import * as style from './style.css'

const Home: FunctionalComponent = () => {
  const [sort, setSort] = useState<string>('kdRatio')
  const patrick = kdHook('playbyclover')
  const joe = kdHook('josefbenassi%237491959', 'atvi')
  const lewis = kdHook('lewisjblyth1')
  const jamie = kdHook('jamiemalcolm04')
  const kds = [patrick, joe, lewis, jamie]
  const findStats = useCallback(
    (player: KD | null): Segment['stats'] | null =>
      player?.segments.find(({ type }) => type === 'overview')?.stats ?? null,
    []
  )

  return (
    <div class={style.home}>
      <Stack spacing={3}>
        <Stack mb={3} spacing={3}>
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="3xl" pt={10} fontWeight="300">
              Scoreboard
            </Heading>
            <Box>
              <Select
                placeholder="Sort by"
                onChange={({ target }) => setSort(target.value)}
                value={sort}
              >
                {Object.entries(findStats(patrick) ?? {}).map(([key, stat]) => (
                  <option value={key} key={key}>
                    {stat.displayName}
                  </option>
                ))}
              </Select>
            </Box>
          </Flex>
          <Divider />
        </Stack>

        <HStack spacing={3} minW="1000px">
          {kds
            .filter(v => !!v)
            .sort((a, b) => {
              const statA = findStats(a)
              const statB = findStats(b)
              if (!statA || !statB) return 0
              return statB[sort].value - statA[sort].value
            })
            .map((kd, key) => (
              <User key={key} kd={kd} sort={sort} />
            ))}
        </HStack>
      </Stack>
    </div>
  )
}

export default Home
