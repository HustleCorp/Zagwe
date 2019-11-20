import React from "react"
import renderer from "react-test-renderer"
import { shallow } from "enzyme"
import MasterLoadingComponent from "./MasterLoadingComponent"

import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({
  adapter: new Adapter()
})

describe("MasterLoadingComponent", () => {
  it("Load without crashing", () => {
    shallow(<MasterLoadingComponent error={true} />)
  })

  it("renders correctly", () => {
    const component = shallow(<MasterLoadingComponent timedOut={true} />)
    expect(component).toMatchSnapshot()
  })
})
