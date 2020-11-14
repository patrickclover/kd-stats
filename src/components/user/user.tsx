import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  StatHelpText,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/core'
import { SpinnerIcon } from '@chakra-ui/icons'
import { Fragment, h } from 'preact'
import { useMemo } from 'preact/hooks'
import { KD } from '../../@types/kd.type'

interface PassedProps {
  kd: KD | null
  sort: string
}

const User = ({ kd, sort }: PassedProps) => {
  const bgColor = useColorModeValue('white', 'black')
  const getUpdate = useMemo(() => {
    if (!kd?.expiryDate) return ''
    return new Date(kd?.expiryDate)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  }, [kd])
  const overview = useMemo(() => {
    if (!kd?.segments) return null
    return kd?.segments.find(
      ({ metadata }) => metadata.name === 'Battle Royale'
    )
  }, [kd])

  if (!overview) return <Fragment></Fragment>

  return (
    <Flex flex="1" direction="column" ml={3} mr={3}>
      <Box
        d="flex"
        pb={3}
        pt={3}
        top={0}
        position="sticky"
        bg={bgColor}
        zIndex="2"
      >
        <Avatar src={kd?.platformInfo.avatarUrl}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Box ml="3" w="100%">
          <Box>
            <Text isTruncated fontWeight="bold" fontSize="sm">
              {kd?.platformInfo.platformUserIdentifier}
            </Text>
            <Text isTruncated fontSize="xs">
              {getUpdate}
            </Text>
          </Box>
        </Box>
        <IconButton
          icon={<SpinnerIcon />}
          onClick={() => (kd ? kd.reload() : undefined)}
          aria-label="refresh"
          isLoading={kd?.loading}
          variant="ghost"
        />
      </Box>

      {Object.entries(overview?.stats ?? {}).map(([key, stat]) => (
        <Stat
          pr={3}
          pt={2}
          key={key}
          pl={3}
          bg={key === sort ? 'pink.500' : undefined}
          borderRadius={5}
        >
          <StatLabel>{stat.displayName}</StatLabel>
          <StatNumber>{stat.displayValue}</StatNumber>

          <StatHelpText>Percentile {stat.percentile || 'N/A'}%</StatHelpText>

          {key !== sort && <Divider />}
        </Stat>
      ))}
    </Flex>
  )
}

export default User
