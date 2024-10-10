import Foundation

@objc(KeyboardObserver)
class KeyboardObserver: NSObject {
  @objc
  func isKeyboardShown(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      if let keyWindow = UIApplication.shared.windows.first(where: { $0.isKeyWindow }),
         let _ = keyWindow.firstResponder {
        resolve(true)
      } else {
        resolve(false)
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}