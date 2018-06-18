import React, { Component } from "react"
import { Flipped } from "../../../src/index"
import { tween, styler, easing, stagger } from "popmotion"

class FocusedUser extends Component {
  hideElements = (el, startId) => {
    const elements = [].slice.apply(el.querySelectorAll("*[data-fade-in]"))
    elements.forEach(el => (el.style.opacity = "0"))
  }
  animateIn = el => {
    const elements = [].slice.apply(el.querySelectorAll("*[data-fade-in]"))

    const animations = elements.map(() => {
      return tween({
        from: {
          opacity: 0,
          translateY: -30
        },
        to: {
          opacity: 1,
          translateY: 0
        },
        duration: 250
      })
    })

    stagger(animations, 100).start(values => {
      elements.forEach((el, i) => styler(el).set(values[i]))
    })
  }

  render() {
    const { data, index, close } = this.props
    const parentFlipId = `card-${index}`

    if (typeof index !== "number") return null

    const duration = 500

    return (
      <div className="focusedItemBackground" key={parentFlipId}>
        <Flipped
          flipId={parentFlipId}
          transformOrigin="0 0"
          onStart={this.hideElements}
          onComplete={this.animateIn}
          componentId="focusedUser"
          duration={duration}
          ease="backOut"
        >
          <div
            className="gridItem gridItemFocused"
            role="button"
            ref={el => (this.el = el)}
          >
            <Flipped
              inverseFlipId={parentFlipId}
              transformOrigin="0 0"
              componentId="focusedUser"
            >
              <div>
                <div>
                  <button
                    className="gridItemFocusedClose"
                    onClick={close}
                    data-fade-in
                  >
                    ✖
                  </button>
                  <h2 className="gridItemTitle" data-fade-in>
                    {data.name}
                  </h2>
                  <Flipped
                    flipId={`${parentFlipId}-avatar`}
                    transformOrigin="0 0"
                    componentId="focusedUserAvatar"
                    ease="backOut"
                    duration={duration}
                  >
                    <img
                      src={data.avatar}
                      alt={`user profile for ${data.name}`}
                      className="gridItemAvatar"
                    />
                  </Flipped>

                  <h2 data-fade-in className="gridItemJob">
                    {data.job}
                  </h2>
                  <p data-fade-in className="gridItemDescription">
                    {data.text}
                  </p>
                  <Flipped
                    flipId={`${parentFlipId}-background`}
                    componentId="focusedUserBackground"
                    transformOrigin="0 0"
                    duration={duration}
                    ease="backOut"
                  >
                    <div
                      className="gridItemBackground"
                      style={{ backgroundColor: data.color }}
                    />
                  </Flipped>
                </div>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </div>
    )
  }
}

export default FocusedUser