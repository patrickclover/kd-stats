import { useCallback, useEffect, useState } from 'preact/hooks'
import { KD } from '../@types/kd.type'
import { get } from '../util/fetchHelper'

const baseUrl = 'https://api.tracker.gg/api/v2/warzone/standard/profile'
const kdHook = (username: string, type = 'xbl') => {
  const [user, setUser] = useState<KD | null>(null)

  const getUser = useCallback(async () => {
    try {
      console.log(username)
      const user = await get<{ data: KD }>(`${baseUrl}/${type}/${username}`)
      setUser(user.data)
    } catch {}
  }, [type, username])

  useEffect(() => {
    getUser()
  }, [getUser])

  return user
}

export default kdHook
