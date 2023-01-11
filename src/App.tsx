import RootLayout from '$layouts/RootLayout'
import Wrapper from '$layouts/Wrapper'

const App = () => {
  return (
    <RootLayout>
      <Wrapper>
        <h1 className="text-center text-8xl pt-[10vh]">Hello world</h1>
      </Wrapper>
    </RootLayout>
  )
}

export default App
