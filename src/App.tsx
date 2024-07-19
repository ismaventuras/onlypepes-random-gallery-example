import { useQuery } from '@tanstack/react-query'
import { T_RESPONSE_RANDOM } from './types'
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Timer } from 'lucide-react';

const limit = 6

const fetchPepe = async () => {
  const response = await fetch(`https://api.onlypepes.xyz/v1/random?limit=${limit}`)
  const json = await response.json()
  // await new Promise(r => setTimeout(r, 2000));
  return json
}

const ImageSkeleton = () => (
  <motion.img
    initial={{ opacity: 0.25 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className='w-full h-[300px] border-green-900 bg-green-800 rounded-xl shadow shadow-green-800 animate-pulse'
  />
);

function App() {
  const { data, isLoading, error, isRefetching } = useQuery<T_RESPONSE_RANDOM, Error>({
    queryKey: ['pepe'],
    queryFn: fetchPepe,
    refetchInterval: 10_000,
    refetchOnWindowFocus: false
  })

  if (error) return <div>Error: {error.message}</div>


  return (
    <>
    <main className='container mx-auto mt-8 max-w-5xl'>
      <div className='flex justify-between flex-wrap'>
        <h1 className='font-medium text-xl'>random gallery</h1>
        {/* <a href='https://api.onlypepes.xyz/v1/random' target='_blank' className='underline text-blue-500 text-center text-sm'>https://api.onlypepes.xyz/v1/random</a> */}
      </div>
      <hr className='my-4  rounded' />
      <Alert className='my-4 border-green-900 text-green-900'>
        <Timer className="h-4 w-4 " color='#14532d'/>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          The gallery updates every 10 seconds or every time you access the page
        </AlertDescription>
      </Alert>

      <AnimatePresence mode="wait">
        <motion.div
          key={(isLoading || isRefetching) ? 'loading' : 'loaded'}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`grid sm:grid-cols-3 gap-4 place-content-center`}
        >
          {(isLoading || isRefetching) ? (
            Array.from({ length: limit }).map((_, index) => <ImageSkeleton key={index} />)
          ) : (
            data?.result.map(r => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full'
              >
                <motion.img
                  alt='pepe'
                  src={r.url}
                  width={300}
                  height={300}
                  className={`w-full h-[300px] border border-green-900 bg-green-800 rounded-xl shadow-2xl shadow-green-800`}
                  // loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
      <hr className='my-4  rounded' />

      <div className='mb-4'>
          <p className=' text-right text-sm text-gray-600'>An example from <a href='https://onlypepes.xyz' target='_blank' className='underline'>https://onlypepes.xyz</a></p>
      </div>
    </main>
    </>
  )
}

export default App
