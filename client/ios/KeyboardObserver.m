#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(KeyboardObserver, NSObject)

RCT_EXTERN_METHOD(isKeyboardShown:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end