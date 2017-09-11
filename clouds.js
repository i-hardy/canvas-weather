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
    this.context.globalAlpha = 1.0
    this.context.fillStyle = this.skyColour()
    this.context.fillRect(0, 0, this.maxX, this.maxY)
    this.visibleSun()
    this.drawClouds()
  }

  drawClouds () {
    var weather = this
    weather.context.globalAlpha = this.cloudDensity()
    weather.context.fillStyle = this.cloudColour()
    for (var i = 0; i < weather.SKY_HEIGHT; i++) {
      for (var j = 0; j < weather.SKY_WIDTH; j++) {
        weather.drawOneCloud(i, j)
      }
    }
  }

  drawOneCloud (i, j) {
    if (this.skyScape[i][j] === 0) {
      this.context.fillRect(j * (this.cloudSize * 2),
                               i * this.cloudSize,
                               this.cloudSize * 2,
                               this.cloudSize)
    }
  }

  visibleSun () {
    if (this.isSunny) {
      this.context.beginPath()
      this.context.arc(this.maxX / 2, this.maxY / 2, 100, 0, 2 * Math.PI)
      this.context.fillStyle = 'yellow'
      this.context.fill()
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
    return '#808080'
  }

  cloudDensity () {
    if (this.isSunny) {
      return 0.8
    }
    return 0.2
  }
}
