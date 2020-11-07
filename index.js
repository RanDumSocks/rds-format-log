exports._settings = {
  profile: "default"
}

exports._profile = undefined

exports._loadProfile = function() {
  if (!exports._profile) {
    var fs = require('fs')
    exports._profile = JSON.parse(fs.readFileSync(`./profiles/${exports._settings.profile}.json`, 'utf8'))

    var maxTagLength = 0
    for (const type in exports._profile) {
      if (type == "terminalDefault") { continue }
      maxTagLength = Math.max(maxTagLength, exports._profile[type].tag.length)
    }
    for (const type in exports._profile) {
      if (type == "terminalDefault") { continue }
      exports._profile[type].tag = `[${exports._profile[type].tag}] ` +
               `${" ".repeat(maxTagLength - exports._profile[type].tag.length)}`
    }
  }
}

exports.log = function(content, type) {
  exports._loadProfile()
  var typeSettings = exports._profile[type]
  console.log(`${typeSettings.terminalColor}` +
              `${typeSettings.tag}` +
              `${exports._profile.terminalDefault}` +
              `${content}`)
}