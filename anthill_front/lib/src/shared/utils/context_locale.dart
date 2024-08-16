import 'package:flutter/widgets.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

extension ContextLocale on BuildContext {
  AppLocalizations get locale => AppLocalizations.of(this);
}