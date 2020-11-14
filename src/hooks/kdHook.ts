import { toast, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { KD } from '../@types/kd.type'
import { get } from '../util/fetchHelper'
import useLocalStorage from './useLocalStorage'

const baseUrl = 'https://api.tracker.gg/api/v2/warzone/standard/profile'
const kdHook = (username: string, type = 'xbl'): KD | null => {
  const [user, setUser] = useLocalStorage<KD | null>(username, null)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const getUser = useCallback(async () => {
    try {
      setLoading(true)

      const u = await get<{ data: KD }>(
        `https://cors-anywhere.herokuapp.com/${baseUrl}/${type}/${username}`
      )
      toast({
        position: 'bottom-left',
        title: `${username} loaded`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setUser(u.data)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [toast, type, username])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!user || typeof user !== 'object') return null
  console.log(user, 'here')
  return { ...user, loading, reload: getUser }
}

export default kdHook
