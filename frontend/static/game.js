var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1366,
  height: 768,
  backgroundColor: '#33E3FF',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

var game = new Phaser.Game(config)

function preload() {
  this.load.image('destructor', 'static/assets/destructor.png')
}

function create() {
  var self = this
  this.socket = io("http://localhost:3000")
  this.otherPlayers = this.physics.add.group()

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id])
      } else {
        addOtherPlayers(self, players[id])
      }
    })
  })

  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo)
  })

  this.socket.on('playerDisconnected', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy()
      }
    })
  })

  this.cursors = this.input.keyboard.createCursorKeys()

  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation)
        otherPlayer.setPosition(playerInfo.x, playerInfo.y)
      }
    })
  })
}

function addPlayer(self, playerInfo) {
  self.destructor = self.physics.add.image(playerInfo.x, playerInfo.y, 'destructor')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(150, 50)

  self.destructor.setCollideWorldBounds(true)
  self.destructor.setTint(playerInfo.color)
  self.destructor.setDrag(1000)
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.physics.add.image(playerInfo.x, playerInfo.y, 'destructor')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(150, 50)
    .setRotation(playerInfo.rotation)
    
  otherPlayer.playerId = playerInfo.playerId
  otherPlayer.setTint(playerInfo.color)
  self.otherPlayers.add(otherPlayer)
}

function update() {
  if (this.destructor) {
    if (this.cursors.left.isDown && (this.cursors.up.isDown || this.cursors.down.isDown)) {
      this.destructor.setAngularVelocity(-100)
    } else if (this.cursors.right.isDown && (this.cursors.up.isDown || this.cursors.down.isDown)) {
      this.destructor.setAngularVelocity(100)
    } else {
      this.destructor.setAngularVelocity(0)
    }

    const velX = Math.cos((this.destructor.angle - 360) * 0.01745)
    const velY = Math.sin((this.destructor.angle - 360) * 0.01745)
    if (this.cursors.up.isDown) {
      this.destructor.setVelocityX(200 * velX)
      this.destructor.setVelocityY(200 * velY)
    } else if (this.cursors.down.isDown) {
      this.destructor.setVelocityX(-100 * velX)
      this.destructor.setVelocityY(-100 * velY)
    } else {
      this.destructor.setAcceleration(0)
    }

    var x = this.destructor.x
    var y = this.destructor.y
    var r = this.destructor.rotation
    if (this.destructor.oldPosition && (x !== this.destructor.oldPosition.x || y !== this.destructor.oldPosition.y || r !== this.destructor.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.destructor.x, y: this.destructor.y, rotation: this.destructor.rotation })
    }

    this.destructor.oldPosition = {
      x: this.destructor.x,
      y: this.destructor.y,
      rotation: this.destructor.rotation
    }
  }
}
