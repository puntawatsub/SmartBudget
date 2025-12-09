import { useState } from 'react'

const useStepper = (dataSource, step) => {
  const [selected, setSelected] = useState(data.slice(0, step))
  const [data, setDataRaw] = useState(dataSource)
  let stepValue = 0
  const [stepNum, setStepNum] = useState(0)
  const [stepMax, setStepMax] = useState(Math.ceil(dataSource.length / step))

  const setSelectedStep = (sv) => {
    setSelected(data.slice(0 + sv, step + sv))
  }

  const setData = (newData) => {
    setDataRaw(newData)
    setStepMax(Math.ceil(newData.length / step))
  }

  const stepUp = () => {
    if (stepValue + step * 2 > data.length) {
      return
    }
    stepValue += step
    setSelectedStep(stepValue)
    setStepNum((i) => i + 1)
  }

  const stepDown = () => {
    if (stepValue - step < 0) {
      return
    }
    stepValue -= step
    setSelectedStep(stepValue)
    setStepNum((i) => i - 1)
  }

  return {
    selected,
    stepNum,
    stepUp,
    stepDown,
    data,
    setData,
    stepMax,
  }
}

export default useStepper
