import {
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
} from '@chakra-ui/react'
import { SpinnerIcon } from '@chakra-ui/icons'
import { FunctionalComponent, h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
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
  const kds = useMemo(() => [patrick, joe, lewis, jamie], [
    jamie,
    joe,
    lewis,
    patrick,
  ])

  const loading = useMemo(
    () => kds.filter(item => !!item?.loading).length > 1,
    [kds]
  )

  const findStats = useCallback(
    (player: KD | null): Segment['stats'] | null =>
      player?.segments.find(({ metadata }) => metadata.name === 'Battle Royale')
        ?.stats ?? null,
    []
  )

  return (
    <div class={style.home}>
      <Stack spacing={3} pl={3}>
        <Stack mb={3} spacing={3} pl={3}>
          <Flex justify="space-between" align="flex-end">
            <Heading as="h1" size="xl" pt={10} fontWeight="300">
              Scoreboard
            </Heading>

            <HStack pr={3}>
              <IconButton
                variant="outline"
                aria-label="reload"
                isLoading={loading}
                icon={<SpinnerIcon />}
                onClick={() => {
                  kds.forEach(item => {
                    item?.reload()
                  })
                }}
              />
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
            </HStack>
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
