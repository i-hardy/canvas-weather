class Weather {
  constructor (context, maxX, maxY) {
    this.cloudSize = 80
    this.context = context
    this.maxX = maxX
    this.maxY = maxY
    this.isSunny = (Math.floor(Math.random() * 2) + 1) === 2
  }

  drawSky () {
    this.context.globalAlpha = 1.0
    this.context.fillStyle = this.skyColour()
    this.context.fillRect(0, 0, this.maxX, this.maxY)
    this.visibleSun()
    this.populateClouds()
    this.drawClouds()
  }

  populateClouds () {
    this.clouds = []
    while (this.clouds.length < 10) {
      this.clouds.push(this.createCloud())
    }
  }

  createCloud () {
    var cloud = {x: this.randomX(), y: this.randomY(), width: this.cloudSize * 2, height: this.cloudSize}
    if (!this.cloudCollision(cloud)) {
      return cloud
    } else {
      return this.createCloud()
    }
  }

  drawClouds () {
    var weather = this
    weather.context.globalAlpha = this.cloudDensity()
    weather.context.fillStyle = this.cloudColour()
    weather.clouds.forEach(function (cloud) {
      weather.drawOneCloud(cloud)
    })
  }

  drawOneCloud (cloud) {
    this.context.fillRect(cloud.x, cloud.y, cloud.width, cloud.height)
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

  cloudCollision (newCloud) {
    return this.clouds.some(function (cloud) {
      return newCloud.x < cloud.x + cloud.width &&
         newCloud.x + newCloud.width > cloud.x &&
         newCloud.y < cloud.y + cloud.height &&
         newCloud.height + newCloud.y > cloud.y
    })
  }

  randomX () {
    return (Math.floor(Math.random() * (this.maxX - this.cloudSize)) - this.cloudSize)
  }

  randomY () {
    var offset = (this.cloudSize / 2)
    return (Math.floor(Math.random() * (this.maxY - offset)) - offset)
  }
}
