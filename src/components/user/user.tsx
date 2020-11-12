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
  Stack,
  StatHelpText,
} from '@chakra-ui/core'
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import { KD } from '../../@types/kd.type'

interface PassedProps {
  kd: KD | null
  sort: string
}

const User = ({ kd, sort }: PassedProps) => {
  const getUpdate = useMemo(() => {
    if (!kd?.expiryDate) return ''
    return new Date(kd?.expiryDate)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  }, [kd])
  const overview = useMemo(
    () => kd?.segments.find(({ type }) => type === 'overview'),
    [kd]
  )
  return (
    <Flex flex="1" direction="column" ml={3} mr={3}>
      <Box d="flex">
        <Avatar src={kd?.platformInfo.avatarUrl}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Box ml="3" w="100%" pb={5}>
          <Box>
            <Text fontWeight="bold" fontSize="sm">
              {kd?.platformInfo.platformUserIdentifier}
            </Text>
            <Text fontSize="sm">Last update: {getUpdate}</Text>
          </Box>
        </Box>
      </Box>

      {Object.entries(overview?.stats ?? {}).map(([key, stat]) => (
        <Stat
          pr={3}
          pt={2}
          key={key}
          bg={key === sort ? 'green.400' : undefined}
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
