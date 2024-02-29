import { isAxiosError } from 'axios'
import { AppDispatch } from '../../app/store.ts'
import { setAppErrorAC } from '../../app/app-reducer.ts'

export const handleError = (e: unknown, dispatch: AppDispatch) => {
  //console.log(e)
  let errorMessage: string
  if (isAxiosError<ServerError>(e)) {
    errorMessage = e.response
      ? e.response.data.errorMessages[0].message
      : e.message
  } else {
    errorMessage = (e as Error).message
  }
  console.warn(`ERROR: ${errorMessage}`)
  dispatch(setAppErrorAC(errorMessage))
}

type ServerError = {
  errorMessages: Array<{ field: string; message: string }>
}

