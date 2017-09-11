class Weather {
  constructor (context, maxX, maxY) {
    this.cloudSize = 40
    this.context = context
    this.maxX = maxX
    this.maxY = maxY
    this.SKY_WIDTH = this.maxX / (this.cloudSize * 2)
    this.SKY_HEIGHT = this.maxY / this.cloudSize
    this.skyScape = []
    this.isSunny = (Math.floor(Math.random() * 2) + 1) === 2
  }

  setSky () {
    for (var i = 0; i < this.SKY_HEIGHT; i++) {
      this.skyScape.push(this.setSkyRow())
    }
  }

  setSkyRow () {
    var row = []
    for (var i = 0; i < this.SKY_WIDTH; i++) {
      row.push(Math.floor(Math.random() * 5))
    }
    return row
  }

  drawSky () {
    this.setSky()
    this.context.fillStyle = this.skyColour()
    this.context.fillRect(0, 0, this.maxX, this.maxY)
    this.visibleSun()
    this.drawClouds()
  }

  drawClouds () {
    var weather = this
    weather.context.fillStyle = this.cloudColour()
    for (var i = 0; i < weather.SKY_HEIGHT; i++) {
      for (var j = 0; j < weather.SKY_WIDTH; j++) {
        if (weather.skyScape[i][j] === 0) {
          weather.context.fillRect(j * (this.cloudSize * 2),
                                   i * this.cloudSize,
                                   weather.cloudSize * 2,
                                   weather.cloudSize)
        }
      }
    }
  }

  visibleSun () {
    if (this.isSunny) {
      this.context.fillStyle = 'yellow'
      this.context.fillRect((this.maxX / 2) - 50, (this.maxY / 2) - 50, 100, 100)
    }
  }

  skyColour () {
    if (this.isSunny) {
      return '#00BFFF'
    }
    return '#D3D3D3'
  }

  cloudColour () {
    if (this.isSunny) {
      return 'white'
    }
    return '#696969'
  }
}
